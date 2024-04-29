const searchTextFields = async (filterQuery) => {
    const searchKey = Object.keys(filterQuery);
    const searchValue = Object.values(filterQuery);
    let searchQuery = `SELECT *,(SELECT ARRAY(SELECT p.permission_id FROM user_access_permissions p WHERE p.user_id = users.id))AS permissions FROM users WHERE`;
    const queryLength = Object.keys(filterQuery).length;
    for (var i = 0; i < queryLength; i++) {
        if (i != queryLength - 1) {
            searchQuery += ` ${searchKey[i]} = '${searchValue[i]}' AND`;
        } else {
            searchQuery += ` ${searchKey[i]} = '${searchValue[i]}'`;
        }
    }
    return searchQuery;
};
module.exports = searchTextFields;
