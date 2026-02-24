module com.examlple {
    requires jakarta.persistence;
    requires org.hibernate.orm.core;
    requires java.naming;

    requires javafx.controls;
    requires javafx.fxml;

    // Hibernate/JPA entity
    opens com.example.pojos to org.hibernate.orm.core, javafx.base;
    exports com.example.pojos;

    exports com.example.service;

    // JavaFX needs access to Application
    exports com.example.controller;

    // nếu có FXML controller
    opens com.example.controller to javafx.fxml;
}