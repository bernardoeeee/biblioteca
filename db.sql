create database biblioteca;
use biblioteca;

create table Usuario (
    Id_user int primary key auto_increment not null,
    nome varchar(255),
    email varchar(255),
    senha varchar(255)
);

create table livros(
	id_livros int primary key auto_increment not null,
    titulo varchar(255) not null,
    autor varchar(255) not null,
    descricao varchar(255) not null,
    anoPublicacao int not null,
    id_usuario int not null,
    data_insercao datetime , 
    foreign key (id_usuario) references Usuario(Id_user)
);
