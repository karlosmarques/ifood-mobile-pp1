-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rua` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itempedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `produtoId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `precoUnitario` DOUBLE NOT NULL,

    INDEX `ItemPedido_pedidoId_fkey`(`pedidoId`),
    INDEX `ItemPedido_produtoId_fkey`(`produtoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `restauranteId` INTEGER NOT NULL,
    `dataPedido` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,
    `valorTotal` DOUBLE NOT NULL,

    INDEX `Pedido_restauranteId_fkey`(`restauranteId`),
    INDEX `Pedido_usuarioId_fkey`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `imagemUrl` VARCHAR(191) NOT NULL,
    `restauranteId` INTEGER NOT NULL,

    INDEX `Produto_restauranteId_fkey`(`restauranteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `imagemUrl` VARCHAR(191) NOT NULL,
    `categoriaId` INTEGER NOT NULL,

    INDEX `Restaurante_categoriaId_fkey`(`categoriaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `enderecoId` INTEGER NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    INDEX `Usuario_enderecoId_fkey`(`enderecoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `itempedido` ADD CONSTRAINT `ItemPedido_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itempedido` ADD CONSTRAINT `ItemPedido_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `Pedido_restauranteId_fkey` FOREIGN KEY (`restauranteId`) REFERENCES `restaurante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pedido` ADD CONSTRAINT `Pedido_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `Produto_restauranteId_fkey` FOREIGN KEY (`restauranteId`) REFERENCES `restaurante`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restaurante` ADD CONSTRAINT `Restaurante_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `Usuario_enderecoId_fkey` FOREIGN KEY (`enderecoId`) REFERENCES `endereco`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
