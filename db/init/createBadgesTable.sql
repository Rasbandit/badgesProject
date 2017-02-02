create table if not exists badges (
  id serial primary key,
  user_id int references users(id),
  user_name varchar(255),
  html_badge boolean,
  basic_js_badge boolean,
  int_js_badge boolean,
  angular_badge boolean,
  node_badge boolean,
  sql_badge boolean,
  pproj_badge boolean,
  gproj_badge boolean 
)