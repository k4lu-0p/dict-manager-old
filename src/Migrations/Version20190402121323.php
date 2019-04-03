<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190402121323 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE flat_rate (id INT AUTO_INCREMENT NOT NULL, customer_id INT DEFAULT NULL, session_number INT NOT NULL, price INT NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_B7ADE9CD9395C3F3 (customer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE session (id INT AUTO_INCREMENT NOT NULL, flat_rate_id INT DEFAULT NULL, free TINYINT(1) NOT NULL, date_start DATETIME NOT NULL, date_end DATETIME DEFAULT NULL, INDEX IDX_D044D5D4D8ED5764 (flat_rate_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE admin (id INT AUTO_INCREMENT NOT NULL, lastname VARCHAR(65) NOT NULL, firstname VARCHAR(65) NOT NULL, phone VARCHAR(25) NOT NULL, society_number VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, username VARCHAR(100) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:simple_array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE bill (id INT AUTO_INCREMENT NOT NULL, customer_id INT DEFAULT NULL, flat_rate_id INT DEFAULT NULL, tax INT NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_7A2119E39395C3F3 (customer_id), UNIQUE INDEX UNIQ_7A2119E3D8ED5764 (flat_rate_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE customer (id INT AUTO_INCREMENT NOT NULL, firstname VARCHAR(100) NOT NULL, lastname VARCHAR(100) NOT NULL, phone VARCHAR(20) NOT NULL, email VARCHAR(100) NOT NULL, address_number VARCHAR(20) DEFAULT NULL, street_number VARCHAR(20) DEFAULT NULL, street_name VARCHAR(150) DEFAULT NULL, city VARCHAR(100) DEFAULT NULL, pc VARCHAR(50) DEFAULT NULL, country VARCHAR(50) DEFAULT NULL, building VARCHAR(50) DEFAULT NULL, created_at DATETIME NOT NULL, newsletter TINYINT(1) NOT NULL, picture VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE newsletter (id INT AUTO_INCREMENT NOT NULL, subject VARCHAR(255) NOT NULL, content LONGTEXT NOT NULL, picture VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE flat_rate ADD CONSTRAINT FK_B7ADE9CD9395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE session ADD CONSTRAINT FK_D044D5D4D8ED5764 FOREIGN KEY (flat_rate_id) REFERENCES flat_rate (id)');
        $this->addSql('ALTER TABLE bill ADD CONSTRAINT FK_7A2119E39395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('ALTER TABLE bill ADD CONSTRAINT FK_7A2119E3D8ED5764 FOREIGN KEY (flat_rate_id) REFERENCES flat_rate (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE session DROP FOREIGN KEY FK_D044D5D4D8ED5764');
        $this->addSql('ALTER TABLE bill DROP FOREIGN KEY FK_7A2119E3D8ED5764');
        $this->addSql('ALTER TABLE flat_rate DROP FOREIGN KEY FK_B7ADE9CD9395C3F3');
        $this->addSql('ALTER TABLE bill DROP FOREIGN KEY FK_7A2119E39395C3F3');
        $this->addSql('DROP TABLE flat_rate');
        $this->addSql('DROP TABLE session');
        $this->addSql('DROP TABLE admin');
        $this->addSql('DROP TABLE bill');
        $this->addSql('DROP TABLE customer');
        $this->addSql('DROP TABLE newsletter');
    }
}
