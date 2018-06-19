
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
    //take list, split into comma character
    const invalidEmails = emails
    .split(',')
    //for every email, trim it and return it, end sup on emails array
    .map(email => email.trim())
    //capture emails that fail test, return false
    .filter(email => re.test(email) === false)

    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }

    return;
}