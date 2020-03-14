import {ContactSalesForm} from '📤';
import {ContactSalesNotify} from '📡';

try {

    new ContactSalesNotify().form(ContactSalesForm.validate()).submit();

    Redirect.home(); // TODO "be in touch" screen

} catch ($ModelInvalid){

    Redirect.home().name('contact').invalid($ModelInvalid);

}
