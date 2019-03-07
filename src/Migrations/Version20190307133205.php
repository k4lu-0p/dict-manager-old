<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190307133205 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE bill (id INT AUTO_INCREMENT NOT NULL, customer_id_id INT NOT NULL, tax DOUBLE PRECISION DEFAULT NULL, INDEX IDX_7A2119E3B171EB6C (customer_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE customer (id INT AUTO_INCREMENT NOT NULL, firstname VARCHAR(65) NOT NULL, lastname VARCHAR(65) NOT NULL, phone VARCHAR(25) NOT NULL, email VARCHAR(255) NOT NULL, address_number VARCHAR(20) DEFAULT NULL, street_name VARCHAR(255) DEFAULT NULL, building VARCHAR(255) DEFAULT NULL, pc VARCHAR(25) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, country VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE admin (id INT AUTO_INCREMENT NOT NULL, lastname VARCHAR(65) NOT NULL, firstname VARCHAR(65) NOT NULL, phone VARCHAR(25) NOT NULL, society_number VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE newsletter (id INT AUTO_INCREMENT NOT NULL, subject VARCHAR(255) NOT NULL, content LONGTEXT NOT NULL, picture VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE flat_rate (id INT AUTO_INCREMENT NOT NULL, customer_id INT NOT NULL, session_number INT NOT NULL, price DOUBLE PRECISION NOT NULL, date DATETIME NOT NULL, INDEX IDX_B7ADE9CD9395C3F3 (customer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE session (id INT AUTO_INCREMENT NOT NULL, flat_rate_id INT DEFAULT NULL, date DATETIME NOT NULL, free TINYINT(1) NOT NULL, note VARCHAR(255) DEFAULT NULL, INDEX IDX_D044D5D4D8ED5764 (flat_rate_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE bill ADD CONSTRAINT FK_7A2119E3B171EB6C FOREIGN KEY (customer_id_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE flat_rate ADD CONSTRAINT FK_B7ADE9CD9395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE session ADD CONSTRAINT FK_D044D5D4D8ED5764 FOREIGN KEY (flat_rate_id) REFERENCES flat_rate (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE bill DROP FOREIGN KEY FK_7A2119E3B171EB6C');
        $this->addSql('ALTER TABLE flat_rate DROP FOREIGN KEY FK_B7ADE9CD9395C3F3');
        $this->addSql('ALTER TABLE session DROP FOREIGN KEY FK_D044D5D4D8ED5764');
        $this->addSql('DROP TABLE bill');
        $this->addSql('DROP TABLE customer');
        $this->addSql('DROP TABLE admin');
        $this->addSql('DROP TABLE newsletter');
        $this->addSql('DROP TABLE flat_rate');
        $this->addSql('DROP TABLE session');
    }
}
