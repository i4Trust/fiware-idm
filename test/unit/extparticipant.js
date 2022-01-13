/* eslint-env mocha */
/* eslint-disable snakecase/snakecase */

const sinon = require("sinon");

const oauth2_server = require('oauth2-server');


// Load test configuration
const config_service = require('../../lib/configService.js');
config_service.set_config(require('../config-test'));
const config = config_service.get_config();

const authregistry = require('../../controllers/authregistry/authregistry');
const extparticipant = require('../../controllers/extparticipant/extparticipant');
const models = require('../../models/models.js');
const utils = require('../../controllers/extparticipant/utils');

const build_mocks = function build_mocks() {
  const req = {
    headers: {
      authorization: "Bearer invalid"
    },
    method: "POST",
    is: sinon.stub().returns("application/x-www-form-urlencoded"),
    query: "",
    body: {
      "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      "client_assertion": "client_credentials"
    }
  };
  const res = {
    locals: {},
    render: sinon.spy(),
    json: sinon.spy(),
    end: sinon.spy()
  };
  res.status = sinon.stub().returns(res);
  const next = sinon.spy();

  return [req, res, next];
};


const build_validate_mocks = function build_validate_mocks() {
  const req = {
    headers: {
      authorization: "Bearer invalid"
    },
    method: "POST",
    is: sinon.stub().returns("application/x-www-form-urlencoded"),
    query: "",
    body: {
      "scope": "iSHARE",
      "response_type": "code",
      "client_id": "EU.EORI.NLHAPPYPETS",
      "request": "afs"
    }
  };
  const res = {
    locals: {},
    render: sinon.spy(),
    json: sinon.spy(),
    end: sinon.spy()
  };
  res.status = sinon.stub().returns(res);
  res.location = sinon.stub().returns(res);
  const next = sinon.spy();

  return [req, res, next];
};


describe('External Participant Controller: ', () => {

  before(() => {
    config.pr = {
      client_id: "EU.EORI.NLHAPPYPETS"
    };
    config.ar = {
      url: "internal"
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('authorize endpoint', () => {

    it('should ignore requests not using the iSHARE scope', (done) => {
      const [req, res, next] = build_validate_mocks();
      req.body.scope = "";

      extparticipant.validate_participant(req, res, next);

      // validate_participant is asynchronous so wait request is processed
      setTimeout(() => {
        sinon.assert.calledOnce(next);
        sinon.assert.calledWith(next);
        done();
      });
    });

    it('should report error for requests with response_type != code', (done) => {
      const [req, res, next] = build_validate_mocks();
      req.body.response_type = "token";

      extparticipant.validate_participant(req, res, next);

      // validate_participant is asynchronous so wait request is processed
      setTimeout(() => {
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.notCalled(next);
        done();
      });
    });

    it('should report error for requests missing client_id', (done) => {
      const [req, res, next] = build_validate_mocks();
      delete req.body.client_id;

      extparticipant.validate_participant(req, res, next);

      // validate_participant is asynchronous so wait request is processed
      setTimeout(() => {
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.notCalled(next);
        done();
      });
    });

    it('should report error for requests missing request', (done) => {
      const [req, res, next] = build_validate_mocks();
      delete req.body.request;

      extparticipant.validate_participant(req, res, next);

      // validate_participant is asynchronous so wait request is processed
      setTimeout(() => {
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.notCalled(next);
        done();
      });
    });

    it('should report error for requests with invalid client credentials', (done) => {
      const [req, res, next] = build_validate_mocks();
      sinon.stub(utils, 'assert_client_using_jwt').throws(new oauth2_server.InvalidRequestError(""));

      extparticipant.validate_participant(req, res, next);

      // validate_participant is asynchronous so wait request is processed
      setTimeout(() => {
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.notCalled(next);
        done();
      });
    });

    it('should report error for requests with valid client credentials but not trusted', (done) => {
      const [req, res, next] = build_validate_mocks();
      sinon.stub(utils, 'assert_client_using_jwt').returns(Promise.resolve([{}, {}]));
      sinon.stub(utils, 'validate_participant_from_jwt').throws(new oauth2_server.InvalidRequestError(""));

      extparticipant.validate_participant(req, res, next);

      // validate_participant is asynchronous so wait request is processed
      setTimeout(() => {
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 400);
        sinon.assert.notCalled(next);
        done();
      });
    });

    it('should success for trusted participants', (done) => {
      const [req, res, next] = build_validate_mocks();
      sinon.stub(utils, 'assert_client_using_jwt').returns(Promise.resolve([
        {
          "iss": "",
          "scope": "",
          "redirect_uri": "",
        },
        {}
      ]));
      sinon.stub(utils, 'validate_participant_from_jwt').returns(Promise.resolve("Participant"));
      sinon.stub(models.oauth_client, "upsert");
      sinon.stub(models.oauth_client, "findOne").returns({id: "EU.EORI.NLHAPPYPETS"});

      extparticipant.validate_participant(req, res, next);

      // validate_participant is asynchronous so wait request is processed
      setTimeout(() => {
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 204);
        sinon.assert.notCalled(next);
        done();
      });
    });

  });

  describe('token endpoint', () => {

    it('should manage authorization_code grant_type', (done) => {
      const [req, res, next] = build_mocks();
      req.body.code = "authorization_code";
      req.body.grant_type = "authorization_code";
      req.body.redirect_uri = redirect_uri = "redirect_uri";
      sinon.stub(utils, "assert_client_using_jwt").returns(Promise.resolve([
          {iss: "EU.EORI.NLHAPPYPETS"},
          "client_certificate",
      ]));
      const code = {
        OauthClient: {id: "EU.EORI.NLHAPPYPETS"},
        expires: Date("4000-01-01"),
        extra: {
          iat: null
        },
        redirect_uri: redirect_uri,
        scope: "openid iShare",
        save: sinon.spy(),
        User: {
        }
      };
      sinon.stub(models.oauth_authorization_code, "findOne").returns(code);
      sinon.stub(models.oauth_access_token, "create");
      sinon.stub(utils, "create_jwt")
      utils.create_jwt.onCall(0).returns("id_token");
      utils.create_jwt.onCall(1).returns("access_token");
      sinon.stub(authregistry, "get_delegation_evidence").returns(null);

      extparticipant.token(req, res, next);

      // token is asynchronous so wait request is processed
      setTimeout(() => {
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(res.json);
        sinon.assert.notCalled(next);
        sinon.assert.calledOnce(code.save);
        done();
      });
    });

    it('should manage client_credentials grant_type', (done) => {
      const [req, res, next] = build_mocks();
      req.body.grant_type = "client_credentials";
      sinon.stub(utils, "validate_participant_from_jwt").returns(Promise.resolve("EU.EORI.NLHAPPYPETS"));
      sinon.stub(utils, "assert_client_using_jwt").returns(Promise.resolve([
          {iss: "EU.EORI.NLHAPPYPETS"},
          "client_certificate",
      ]));
      sinon.stub(models.user, "upsert");
      sinon.stub(models.user, "findOne").returns({

      });
      sinon.stub(models.oauth_client, "upsert");
      sinon.stub(models.oauth_client, "findOne").returns({id: "EU.EORI.NLHAPPYPETS"});
      sinon.stub(models.oauth_access_token, "create");
      sinon.stub(utils, "create_jwt")
      utils.create_jwt.onCall(0).returns("id_token");
      utils.create_jwt.onCall(1).returns("access_token");
      sinon.stub(authregistry, "get_delegation_evidence").returns(null);

      extparticipant.token(req, res, next);

      // token is asynchronous so wait request is processed
      setTimeout(() => {
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(res.json);
        sinon.assert.notCalled(next);
        done();
      });
    });

    it('should manage urn:ietf:params:oauth:grant-type:jwt-bearer grant_type', (done) => {
      const [req, res, next] = build_mocks();
      req.body.grant_type = "urn:ietf:params:oauth:grant-type:jwt-bearer";
      sinon.stub(utils, "validate_participant_from_jwt").returns(Promise.resolve("EU.EORI.NLHAPPYPETS"));
      sinon.stub(utils, "assert_client_using_jwt").returns(Promise.resolve([
          {iss: "EU.EORI.NLHAPPYPETS"},
          "client_certificate",
      ]));
      sinon.stub(models.user, "upsert");
      sinon.stub(models.user, "findOne").returns({});
      sinon.stub(models.oauth_client, "upsert");
      sinon.stub(models.oauth_client, "findOne").returns({id: "EU.EORI.NLHAPPYPETS"});
      sinon.stub(models.oauth_access_token, "create");
      sinon.stub(utils, "create_jwt").returns("access_token");

      extparticipant.token(req, res, next);

      // token is asynchronous so wait request is processed
      setTimeout(() => {
        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 200);
        sinon.assert.calledOnce(res.json);
        sinon.assert.notCalled(next);
        done();
      });
    });

  });

});
