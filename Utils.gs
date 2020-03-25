function extend(obj, src) 
{
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
}

function durationFormat(mins) 
{
    var d = Math.floor(mins / 1440);
    var rem = mins % 1440; // remainder after days
    var h = Math.floor(rem / 60);
    rem = rem % 60;
    
    var formatted = "";
    if (d > 0)
        formatted = formatted + d + "d ";
    formatted = formatted +  h + "h " + rem + "m";
    return formatted;
}

