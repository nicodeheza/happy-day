const crypto = require("crypto");

async function hash(password) {
	return new Promise((resolve, reject) => {
		const salt = crypto.randomBytes(16).toString("hex");

		crypto.scrypt(password, salt, 64, (err, key) => {
			if (err) reject(err);
			resolve(salt + ":" + key.toString("hex"));
		});
	});
}

async function verify(password, hash) {
	return new Promise((resolve, reject) => {
		const [salt, key] = hash.split(":");
		crypto.scrypt(password, salt, 64, (err, Pkey) => {
			if (err) reject(err);
			resolve(key == Pkey.toString("hex"));
		});
	});
}

module.exports = {hash, verify};
