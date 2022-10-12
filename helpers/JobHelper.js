var initModels = require("../models/init-models");
var models = initModels();

async function updateJobStatus(jobId, statusId) {
    await models.Jobs.update({ statusId: statusId },
        { where: { id: jobId } })
}

module.exports = {
    updateJobStatus: {
        pending: async (jobId) => {
            await updateJobStatus(jobId, 1)
        },
        assigned: async (jobId) => {
            await updateJobStatus(jobId, 3)
        },
        inProgress: async (jobId) => {
            await updateJobStatus(jobId, 4)
        },
        complete: async (jobId) => {
            await updateJobStatus(jobId, 5)
        },
        failed: async (jobId) => {
            await updateJobStatus(jobId, 6)
        },
        canceled: async (jobId) => {
            await updateJobStatus(jobId, 7)
        }
    },
    getJobs: async (where) => getJobs(where)
}



async function getJobs(where){
    return await models.Jobs.findAll(
        {
            where: where,
            attributes: ["id","createdAt"],
            include: [
                {
                    model: models.JobStatus,
                    attributes: ["name"],
                },
                {
                    model: models.JobDetails,
                },
                {
                    model: models.JobAttachments
                },
                {
                    model: models.JobQuotes,
                    attributes: ["id"],

                },
                {
                    model: models.Services,
                    attributes: ["name"],
                    include: [
                        {
                            model: models.ServiceCategories,
                            attributes: ["name"],
                        },
                        {
                            model: models.ServiceTypes,
                            attributes: ["name"],
                        }
                    ]
                },
            ],
        }
    )
}