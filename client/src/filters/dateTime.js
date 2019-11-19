import Vue from 'vue'

export default {
    dateFromDateTimeString
}

function dateFromDateTimeString (dateTimeString) {
    if (!dateTimeString || !dateTimeString.includes('T')) return dateTimeString
    return dateTimeString.split('T')[0]
}

Vue.filter('dateFromDateTimeString', dateFromDateTimeString)
