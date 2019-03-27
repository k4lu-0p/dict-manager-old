<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190327161139 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE flat_rate CHANGE customer_id customer_id INT DEFAULT NULL, CHANGE date_end date_end DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE session CHANGE flat_rate_id flat_rate_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE bill CHANGE customer_id customer_id INT DEFAULT NULL, CHANGE flat_rate_id flat_rate_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE customer CHANGE address_number address_number VARCHAR(20) DEFAULT NULL, CHANGE street_number street_number VARCHAR(20) DEFAULT NULL, CHANGE street_name street_name VARCHAR(150) DEFAULT NULL, CHANGE city city VARCHAR(100) DEFAULT NULL, CHANGE pc pc VARCHAR(50) DEFAULT NULL, CHANGE country country VARCHAR(50) DEFAULT NULL, CHANGE building building VARCHAR(50) DEFAULT NULL, CHANGE picture picture VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE newsletter CHANGE picture picture VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE bill CHANGE customer_id customer_id INT DEFAULT NULL, CHANGE flat_rate_id flat_rate_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE customer CHANGE address_number address_number VARCHAR(20) DEFAULT \'NULL\' COLLATE utf8mb4_unicode_ci, CHANGE street_number street_number VARCHAR(20) DEFAULT \'NULL\' COLLATE utf8mb4_unicode_ci, CHANGE street_name street_name VARCHAR(150) DEFAULT \'NULL\' COLLATE utf8mb4_unicode_ci, CHANGE city city VARCHAR(100) DEFAULT \'NULL\' COLLATE utf8mb4_unicode_ci, CHANGE pc pc VARCHAR(50) DEFAULT \'NULL\' COLLATE utf8mb4_unicode_ci, CHANGE country country VARCHAR(50) DEFAULT \'NULL\' COLLATE utf8mb4_unicode_ci, CHANGE building building VARCHAR(50) DEFAULT \'NULL\' COLLATE utf8mb4_unicode_ci, CHANGE picture picture VARCHAR(255) DEFAULT \'NULL\' COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE flat_rate CHANGE customer_id customer_id INT DEFAULT NULL, CHANGE date_end date_end DATETIME DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE newsletter CHANGE picture picture VARCHAR(255) DEFAULT \'NULL\' COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE session CHANGE flat_rate_id flat_rate_id INT DEFAULT NULL');
    }
}
