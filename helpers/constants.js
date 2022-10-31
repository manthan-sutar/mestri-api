module.exports = {
    server_url: "http://192.168.1.7:3000/",
    socket_url: "http://192.168.0.108:3000/",
    failed: (message, data) => failed(message, data),
    success: (message, data) => success(message, data),
}

const failed = (message, data) => ({
    status: false,
    message: message,
    data: data
})

const success = (message, data) => ({
    status: true,
    message: message,
    data: data
})