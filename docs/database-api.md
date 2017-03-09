#### drop table (GET)
`/drop/:tablename`

#### create table (POST)
`/add/table`

#### add user (POST)
`/add/user`

#### delete user (POST)
`/delete/user`

#### update user (POST)
`/update/user`
```
{
  table: 'users',
  columns: ['email','password','isadmin']
  values: ['myrealemail@gmail.com', 'hash123', false],
  key: 'email'  
}
```
