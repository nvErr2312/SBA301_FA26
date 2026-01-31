package nhiby.example.lab4New;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Lab4NewApplication {

	public static void main(String[] args) {
		SpringApplication.run(Lab4NewApplication.class, args);
	}

}



//
//CREATE TABLE orchid (
//		orchid_id INT IDENTITY(1,1) PRIMARY KEY,
//is_attractive BIT NULL,
//is_natural BIT NULL,
//name VARCHAR(255) NOT NULL,
//orchid_category VARCHAR(255) NULL,
//orchid_description NVARCHAR(MAX) NULL,
//orchid_url VARCHAR(1000) NULL
//);
