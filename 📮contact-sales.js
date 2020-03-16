import {ContactSalesForm} from '📤';
import {ContactSalesNotify} from '📡';

try {

    new ContactSalesNotify().form(ContactSalesForm.validate()).submit();

    Redirect.home().name('contact-result');

} catch ($ModelInvalid){

    Redirect.home().name('contact').invalid($ModelInvalid);

}
