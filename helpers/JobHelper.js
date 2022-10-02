var initModels = require("../models/init-models");
var models = initModels();

async function updateJobStatus(jobId, statusId) {
    await models.JobStatus.update({
        where: {
            jobId: jobId
        }
    }, {
        statusId: statusId
    })
}

module.exports = {
    updateJobStatus: {
        complete: async (jobId) => {
            updateJobStatus(jobId,5)
        },
        assigned: async (jobId) => {
            updateJobStatus(jobId,3)
        },
        inProgress: async (jobId) => {
            updateJobStatus(jobId,4)
        },
    }
}
