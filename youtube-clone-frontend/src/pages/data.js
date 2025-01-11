export const API_KEY = 'AIzaSyAoLyxvJ5VVKfLi6UYQ10n0USwePQyA4qI';


export const val_convert= (value) => {
    if (value >=1000000)
    {
        return Math.floor(value/1000000) +"M";
    }
    else if(value>=1000)
    {
        return Math.floor(value/1000)+ "K";
    }
    else{
        return value;
    }
}
