var initModels = require("../models/init-models");
var models = initModels();

async function updateJobStatus(jobId, statusId) {
    await models.Jobs.update({ statusId: statusId },
        { where: { id: jobId } })
}

module.exports = {
    updateJobStatus: {
        complete: async (jobId) => {
            await updateJobStatus(jobId, 5)
        },
        assigned: async (jobId) => {
            await updateJobStatus(jobId, 3)
        },
        inProgress: async (jobId) => {
            await updateJobStatus(jobId, 4)
        },
        failed: async (jobId) => {
            await updateJobStatus(jobId, 6)
        },
        canceled: async (jobId) => {
            await updateJobStatus(jobId, 7)
        },
    }
}
