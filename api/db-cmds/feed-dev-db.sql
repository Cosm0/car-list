INSERT INTO users (username, password) 
VALUES ('test', 'test123');
      
INSERT INTO vehicles (brand, model, regNbr, vin, longitude, latitude) 
VALUES 
  ('VW', 'Golf', 'abc123', '123456789qwerty', 10, 20), 
  ('Honda', 'Civic', 'def456', '0987654321qwerty', 50, 40);
    
INSERT INTO renters (firstname, lastname, idNbr, address, email) 
VALUES 
  ('Adam', 'Nowak', 'id123', 'Malinowa 123, Stumilowy Las', 'prosiaczek@100las.pl'), 
  ('Jan', 'Kowalski', 'id456', 'Jagodowa 321, Stumilowy Las', 'tygrysek@100las.pl');