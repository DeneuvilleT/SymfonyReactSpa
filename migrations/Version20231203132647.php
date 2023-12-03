<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231203132647 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE addresses ADD customer_id INT DEFAULT NULL, ADD type TINYINT(1) NOT NULL, ADD created_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE addresses ADD CONSTRAINT FK_6FCA75169395C3F3 FOREIGN KEY (customer_id) REFERENCES customer (id)');
        $this->addSql('CREATE INDEX IDX_6FCA75169395C3F3 ON addresses (customer_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE addresses DROP FOREIGN KEY FK_6FCA75169395C3F3');
        $this->addSql('DROP INDEX IDX_6FCA75169395C3F3 ON addresses');
        $this->addSql('ALTER TABLE addresses DROP customer_id, DROP type, DROP created_at');
    }
}
