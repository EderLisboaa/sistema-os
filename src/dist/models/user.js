"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(user) {
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }
    User.prototype.findAll = function () {
        return [{
                name: 'string',
                email: 'string',
                password: 'string',
                role: 'string',
            }];
    };
    User.prototype.findById = function (id) {
        return {
            name: 'string',
            email: 'string',
            password: 'string',
            role: 'string',
        };
    };
    User.prototype.create = function (user) {
    };
    User.prototype.update = function (id, user) {
    };
    User.prototype.delete = function (id) {
    };
    User.prototype.login = function (email, password) {
        return true;
    };
    return User;
}());
var user = new User({});
exports.User = user;
