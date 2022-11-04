
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

-- criação da tabela usuários
create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);

-- inserindo alguns registros na tabela usuários
insert into usuarios (email, senha, tipo, telefone, nome) 
values ('matheus@teste.com', '123456', 'A','(54)99999-9999','Matheus Campos'), 
('augusto@teste.com', '123456', 'U','(54)66666-6666','Augusto Campos');