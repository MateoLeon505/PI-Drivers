// Validación de erores en el formulario
//------------------------
const textRegex = /^[^\d]*$/;
const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
const errors = {};
//------------------------
const Validation  = (form) =>
{
    // Errores en Image
    if (urlRegex.test(form.image)) 
    {
        errors.image = '';
    }
    else
    {
        errors.image = '❗';
    }
    if (form.image === '')
    {
        errors.image = '';
    }
    //--------------------
    // Errores en Forename 
    if (textRegex.test(form.forename)) 
    {
        errors.forename = '';
    }
    else
    {
        errors.forename = '❗';
    }
    if (form.forename === '')
    {
        errors.forename = '';
    }
    //--------------------
    // Errores en Surname
    if (textRegex.test(form.surname)) 
    {
        errors.surname = '';
    }
    else
    {
        errors.surname = '❗';
    }
    if (form.surname === '')
    {
        errors.surname = '';
    }
    //--------------------
    // Errores en nationality
    if (textRegex.test(form.nationality)) 
    {
        errors.nationality = '';
    }
    else
    {
        errors.nationality = '❗';
    }
    if (form.nationality === '')
    {
        errors.nationality = '';
    }
    return errors;
}
//------------------------
export default Validation;