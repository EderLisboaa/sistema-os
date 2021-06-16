"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(_a) {
        var name = _a.name, email = _a.email, password = _a.password, role = _a.role;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    User.prototype.login = function (_a) {
        var email = _a.email, password = _a.password;
    };
    return User;
}());
exports.User = User;
