export const CreateQueryParams = (obj: { [key: string]: any }): string => {
    const queryParams: string[] = [];
  
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key]) {
        queryParams.push(`${key}=${obj[key]}`);
      }
    }
  
    return queryParams.join('&');
  }