import {ContactSalesNotify} from '📡';

try {

    const notification = new ContactSalesNotify();
    ContactSalesNotify.Form.submit(notification);
    notification.submit();

    Redirect.home().name('contact-result');

} catch ($ModelInvalid){

    Redirect.home().name('contact').invalid($ModelInvalid);

}
