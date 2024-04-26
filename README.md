# ets_nodejs

# To Create Nodejs Project Basic Structure

sequelize-cli init

# To Create Models

sequelize-cli model:generate --name user --attributes user_name:string,name:string,user_type:integer,password:string

# To Run the Migration after creating Models

sequelize db:migrate

# To Create seeder file

sequelize seed:generate --name add-access_permissions

# To run the seeder file

npx sequelize db:seed:all
