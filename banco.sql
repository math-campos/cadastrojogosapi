
create table produtora (
	codigo serial primary key, 
	nome varchar(40) not null, 
	descricao varchar(40) not null
);

create table jogo (
	codigo serial primary key,
	nome varchar(60) not null,
	descricao varchar(40) not null, 
	estrelas integer not null, 
	produtora integer not null, 
	foreign key (produtora) references produtora (codigo)
);
