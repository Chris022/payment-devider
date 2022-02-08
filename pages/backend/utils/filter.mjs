export function basicFilter(column, operator,name){
    return (data) => {
        let parameterName = "@filter"+column+name
        let dataObj = {};
        dataObj["filter"+column+name] = data[column];
        return {
            "data":dataObj,
            "where": column + " " + operator + " " + parameterName
        };
    }
}

export function dateFilter(column, operator,name){
    return (data) => {
        let parameterName = "@filter"+column+name
        let dataObj = {};
        dataObj["filter"+column+name] = data[column];
        return {
            "data":dataObj,
            "where": column + " " + operator + " date(" + parameterName + ")"
        };
    }
}

//combinators
export function andList(listOfFilters){
    return (data) => {
        listOfFilters = listOfFilters.filter(f => f(data)["where"] != ""); //remove empty filters
        let whereConcat   = "( " + listOfFilters.map(filter => filter(data)["where"]).join(" AND ") + " )"
        let dataConcat    = listOfFilters.map(filter => filter(data)["data"]).reduce((a,c) => Object.assign(a,c));
        return {
            "data":dataConcat,
            "where":whereConcat
        };
    }
}

export function orList(listOfFilters){
    return (data) => {
        listOfFilters = listOfFilters.filter(f => f(data)["where"] != ""); //remove empty filters
        let whereConcat   = "( " + listOfFilters.map(filter => filter(data)["where"]).join(" AND ") + " )"
        let dataConcat    = listOfFilters.map(filter => filter(data)["data"]).reduce((a,c) => Object.assign(a,c ));
        return {
            "data":dataConcat,
            "where":whereConcat
        };
    }
}

export function tryOrIgnore(filter){
    return (data) => {
        let evalFilter = filter(data)["data"];

        let isSet = Object.values(evalFilter).map(val => val ? true : false).reduce((a,c) => a && c)

        if(isSet)
            return filter(data);
        else
            return {
                "data":{},
                "where":""
            };
    }
}


export function bind(filter,from,to){
    return (data) => {
        let newData = data;
        newData[to] = data[from];
        return filter(newData)
    }
}
