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
  col: 'email',
  newval: 'myrealemail@gmail.com',
  oldval: 'oopswrongemail@fake.com'        
}
```
