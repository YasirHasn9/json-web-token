# Node Auth 2 Guided Project

Guided project for **Node Auth 2** Module.

## Prerequisites

-web token ? 
is a an open stander that defines compact and self-contained way to transmit information
between parties using json object. this information is secure because 
is digitally signed

token consist of three parts ?
header 
payload 
signature 

how does is work ?
user login 
web token been created 
return token 
token must saved in locally , typically in the localStorage

--when the user tries to access a protected router , user should send the token 
in the authorization header 


this is a stateless authorization mechanism because the state of the user 
is not saved on the server memory 
so when the user checked in the server check the authorization header to see if there is a token been saved there and no need to go the db

1.easy to maintain and debug
2.easy to scale up horizontally 
3.the have the ability to create a truly restful api
4.have en expiration functionality 
5.self contained


jwt consist of three parts separated by (.)
header
payload 
signature 

Header object contains: {
    alg: this is kind of algorithm been used,
    type : jwt
}

payload includes the claims like permission , for example the use id or 
any other data we would like to store in the token


signature we must create the header and payload and secret and encoding them 
and then we are gonna get the jwt


so instead of having our session saved on the server on the db
token helped us without the need to go to the db
server allows for users to have access just by looking to the token


signature is the most important part of the token , because the header and payload
can be beatable and changeable 

signature = hash(header + payload + secretString)


the flow of generating jwt
----------------------------
client sends credentials 
server verifies the credentials 
server creates jwt
server sends back jwt as a header
client stores the jwt in the local storage
client send the jwt on every subsequent request 
server verifies the valid information by checking the signature
server allows for users to get access to resources