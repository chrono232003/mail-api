const { TestScheduler } = require('@jest/core');
const process = require('../process/processData');

test('check validateData success', () => {
    const sampleJson = {
        "from": "noreply@mybrightwheel.com",
        "from_name": "brightwheel",
        "to": "susan@abcpreschool.org",
        "to_name": "Miss Susan",
        "subject": "Weekly Checkin",
        "body": "<h1>Weekly Report</h1><p>You saved 10 hours this week!</p>"
        }

        expect(process.validateData(sampleJson)).toBe("valid");
});

test('check validateData fail blank value', () => {
    const sampleJson = {
        "from": "noreply@mybrightwheel.com",
        "from_name": "brightwheel",
        "to": "susan@abcpreschool.org",
        "to_name": "Miss Susan",
        "subject": "",
        "body": "<h1>Weekly Report</h1><p>You saved 10 hours this week!</p>"
        }

        expect(process.validateData(sampleJson)).toBe("Missing data for subject");
});

test('check validateData fail invalid email address', () => {
    const sampleJson = {
        "from": "noreply@mybrightwheel.com",
        "from_name": "brightwheel",
        "to": "susanabcpreschool.org",
        "to_name": "Miss Susan",
        "subject": "Test Subjext",
        "body": "<h1>Weekly Report</h1><p>You saved 10 hours this week!</p>"
        }

        expect(process.validateData(sampleJson)).toBe("to is not a valid email address");
});


test('check processing HTML to text', () => {
    const html = "<h1>Weekly Report</h1><p>You saved 10 hours this week!</p>"
    expect(process.processHTML(html)).toBe("WEEKLY REPORT\n\nYou saved 10 hours this week!");
});


