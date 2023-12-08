import { decode } from 'base-64';

// export const formatMoney = (amount: any) => {
//     if (amount !== undefined && amount !== null) {
//         return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//     } else {
//         return "";
//     }
// }

export const formatMoney = (value: any) => {
    if (isNaN(value)) {
        return value;
    }
    return parseFloat(value).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
};

export const decodeToken = (token: any) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(decode(base64));
    return payload;
}

export const getUserEmailFromToken = (token: any) => {
    const payload = decodeToken(token);
    const userEmail = payload.email;
    return userEmail
}

export const getUserTypeFromToken = (token: any) => {
    const payload = decodeToken(token);
    const userType = payload.user_type;
    return userType
}

export const formatDatTime = (dateInput: any) => {
    if (!dateInput) {
        return null;
    }

    const dateObject = new Date(dateInput);
    const date = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();

    return `${date}-${month}-${year}`;
}

export const formatDateAndTime = (dateInput: any) => {
    if (!dateInput) {
        return null;
    }

    const dateObject = new Date(dateInput);
    const date = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const seconds = dateObject.getSeconds().toString().padStart(2, '0');

    return `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

