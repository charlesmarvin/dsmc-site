var libphonenumber = require('libphonenumber-umd');
var PNF = libphonenumber.phonenumbers.PhoneNumberFormat;
var phoneUtil = libphonenumber.phonenumbers.PhoneNumberUtil.getInstance();
var moment = require('moment');

module.exports = {
    phoneNumber(number) {
        try {
            var phoneNumber = phoneUtil.parseAndKeepRawInput(number, 'US');
            return phoneUtil.format(phoneNumber, PNF.NATIONAL);
        } catch (e) {
            return number;
        }
    },

    currency(value, currency) {
        if (!currency) {
            currency = 'USD';
        }
        return parseFloat(Math.round(value * 100) / 100).toFixed(2) + ' USD';
    },

    date(date, outputFormat) {
        return moment(date).format(outputFormat);
    },

    cateDiff(from, fromSourceFormat, to, toSourceFormat, unit) {
        if (!unit) {
            unit = 'years';
        }
        if (to) {
            moment(to, toSourceFormat);
        } else {
            to = moment;
        }
        return to.diff(moment(from, fromSourceFormat), unit);
    },

    camelToTitle(str) {
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(s) { return s.toUpperCase(); });
    }
};
