// certificateRepository.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCertificates = async () => {
    return await prisma.certification.findMany();
};

const getCertificateById = async (id) => {
    return await prisma.certification.findUnique({
        where: { id: parseInt(id) }
    });
};

const createCertificate = async (data) => {
    return await prisma.certification.create({
        data
    });
};

const updateCertificate = async (id, data) => {
    return await prisma.certification.update({
        where: { id: parseInt(id) },
        data
    });
};

const deleteCertificate = async (id) => {
    return await prisma.certification.delete({
        where: { id: parseInt(id) }
    });
};

const getCertificateByUserId = async (userId) => {
    try {
        const certificates = await prisma.certification.findMany({
            where: { user_id: userId },
            include: { admin: true, user: true }, // Include relations as needed
        });
        return certificates;
    } catch (error) {
        throw new Error('Error fetching certificates');
    }
};

module.exports = {
    getAllCertificates,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate,
    getCertificateByUserId
};
