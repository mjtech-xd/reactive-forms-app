import { AbstractControl } from "@angular/forms";

export function noSpaces(control: AbstractControl) : {[key: string]: boolean} | null
{
    if(control.value && control.value.includes(' '))
    {
        return { 'noSpaces': true };
    }
    return null;
}

export function minUppercase(count: number) : (control: AbstractControl) => {[key: string]: boolean} | null
{
    return  (control: AbstractControl):{[key: string]: boolean} | null => {
        if(control.value)
        {
            const uppercaseCount: number = (control.value.match(/[A-Z]/g) || []).length;
            if(uppercaseCount < count)
            {
                return { 'minUppercase': true };
            }
        }
        return null;
    };
}

export function passwordsMatch(control: AbstractControl): {[key: string]: boolean} | null
{
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if(!password || !confirmPassword)
    {
        return null;
    }
    if(password.value !== confirmPassword.value)
    {
        return { 'passwordMismatch': true };
    }
    return null;
}
