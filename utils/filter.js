const searchTextFields = async (filterQuery, tableName) => {
        const searchKey = Object.keys(filterQuery);      
        const searchValue = Object.values(filterQuery); 
        let searchQuery = `SELECT * FROM ${tableName} WHERE`; 
        const queryLength = Object.keys(filterQuery).length; 
        for(var i = 0; i < queryLength; i++) 
        { 
            if(i != queryLength-1){ 
                searchQuery += ` ${searchKey[i]} = '${searchValue[i]}' AND`; 
            }else{ 
                searchQuery += ` ${searchKey[i]} = '${searchValue[i]}'`; 
            } 
        }
        return searchQuery;
}
module.exports = searchTextFields;