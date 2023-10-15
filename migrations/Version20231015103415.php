<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231015103415 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE products CHANGE description description VARCHAR(1000) NOT NULL, CHANGE cover cover VARCHAR(1000) NOT NULL, CHANGE brand brand VARCHAR(50) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B3BA5A5AF9038C4 ON products (sku)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_B3BA5A5AF9038C4 ON products');
        $this->addSql('ALTER TABLE products CHANGE description description VARCHAR(1000) DEFAULT NULL, CHANGE cover cover VARCHAR(1000) DEFAULT NULL, CHANGE brand brand VARCHAR(255) NOT NULL');
    }
}
