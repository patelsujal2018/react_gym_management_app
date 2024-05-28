import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().min(1, 'Minimum email length is 1').max(190, 'Maximum email length is 190').required('Email is required'),
    password: Yup.string().min(8, 'Minimum password length is 8').max(30, 'Maximum password length is 30').required('Password is required'),
});

export const employeeSchema = Yup.object().shape({
    employee_role_id: Yup.string().required('Role is required'),
    first_name: Yup.string().min(1, 'Minimum first name length is 1').max(50, 'Maximum first name length is 50').required('First name is required'),
    last_name: Yup.string().min(1, 'Minimum last name length is 1').max(50, 'Maximum last name length is 50').required('Last name is required'),
    email: Yup.string().min(1, 'Minimum email length is 1').max(100, 'Maximum email length is 100').required('Email is required'),
    mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('Mobile is required'),
    salary: Yup.number().min(1, 'Minimum salary is 1').max(1000000, 'Maximum salary is 1000000').required('Salary is required'),
});

export const equipmentSchema = Yup.object().shape({
    category_id: Yup.string().required('Category is required'),
    name: Yup.string().min(1, 'Minimum Equipment Name length is 1').max(50, 'Maximum Equipment Name length is 50').required('Equipment Name is required'),
    description: Yup.string().min(1, 'Minimum Description length is 1').max(100, 'Maximum Description length is 100').required('Description is required'),
    purchase_date: Yup.string().min(1, 'Minimum Purchase Date length is 1').max(100, 'Maximum Purchase Date length is 100').required('Purchase Date is required'),
    warranty_expiry_date: Yup.string().min(1, 'Minimum Warranty Expiry Date length is 1').max(100, 'Maximum Warranty Expiry Date length is 100').required('Warranty Expiry Date is required'),
    status: Yup.string().required('Status is required'),
});

export const equipmentMaintenanceSchema = Yup.object().shape({
    schedule_date: Yup.string().required('Category is required'),
});

export const removeEquipmentMaintenanceSchema = Yup.object().shape({
    remark: Yup.string().required('Maintenance Remark is required')
});

export const createCustomerSchema = Yup.object().shape({
    first_name: Yup.string().min(1, 'Minimum first name length is 1').max(50, 'Maximum first name length is 50').required('First name is required'),
    last_name: Yup.string().min(1, 'Minimum last name length is 1').max(50, 'Maximum last name length is 50').required('Last name is required'),
    email: Yup.string().min(1, 'Minimum email length is 1').max(100, 'Maximum email length is 100').required('Email is required'),
    mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('Mobile is required'),
    id_proof_image: Yup.string().required('Id Proof is required'),
    address: Yup.string().min(1, 'Minimum address is 1').max(190, 'Maximum address is 190').required('Address is required'),
    note: Yup.string().max(190, 'Maximum note is 190'),
    plan_id: Yup.string().required('Plan is required'),
});

export const updateCustomerSchema = Yup.object().shape({
    first_name: Yup.string().min(1, 'Minimum first name length is 1').max(50, 'Maximum first name length is 50').required('First name is required'),
    last_name: Yup.string().min(1, 'Minimum last name length is 1').max(50, 'Maximum last name length is 50').required('Last name is required'),
    email: Yup.string().min(1, 'Minimum email length is 1').max(100, 'Maximum email length is 100').required('Email is required'),
    mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits').required('Mobile is required'),
    id_proof_image: Yup.string().required('Id Proof is required'),
    address: Yup.string().min(1, 'Minimum address is 1').max(190, 'Maximum address is 190').required('Address is required'),
    note: Yup.string().max(190, 'Maximum note is 190'),
});

export const planSchema = Yup.object().shape({
    name: Yup.string().min(1, 'Minimum plan name length is 1').max(50, 'Maximum plan name length is 50').required('Plan name is required'),
    price: Yup.number().min(1, 'Minimum plan name length is 1').max(1000000, 'Maximum plan name length is 10').required('Plan price is required'),
    description: Yup.string().min(1, 'Minimum description is 1').max(190, 'Maximum description is 190').required('Description is required'),
});