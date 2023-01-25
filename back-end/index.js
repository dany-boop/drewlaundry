const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()
app.use(cors())

app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to KuyLaundry Backend API 🚀",
        endpoints: [{
            admin: [{
                getAllData: "/api/admin/",
                getDataById: "/api/admin/:id",
                addData: "/api/admin/",
                updateData: "/api/admin/:id",
                deleteData: "/api/admin/:id",
                login: "/api/admin/login",
                status: 200
            }],
            member: [{
                getAllData: "/api/member/",
                getDataById: "/api/member/:id",
                addData: "/api/member/",
                updateData: "/api/member/:id",
                deleteData: "/api/member/:id",
                status: 200
            }],
            outlet: [{
                getAllData: "/api/outlet/",
                getDataById: "/api/outlet/:id",
                addData: "/api/outlet/",
                updateData: "/api/outlet/:id",
                deleteData: "/api/outlet/:id",
                status: 200
            }],
            package: [{
                getAllData: "/api/package/",
                getDataById: "/api/package/:id",
                addData: "/api/package/",
                updateData: "/api/package/:id",
                deleteData: "/api/package/:id",
                status: 200
            }],
            transactions: [{
                getAllData: "/api/transaction/",
                getDataById: "/api/transaction/:id",
                addData: "/api/transaction/",
                updateData: "/api/transaction/:id",
                deleteData: "/api/transaction/:id",
                status: 200
            }],
            transaction_details: [{
                getAllData: "/api/transaction-detail/",
                getDataById: "/api/transaction-detail/:id",
                addData: "/api/transaction-detail/",
                updateData: "/api/transaction-detail/:id",
                deleteData: "/api/transaction-detail/:id",
                status: 200
            }]
        }]
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/admin', require('./api/admin/admin.router'))
app.use('/api/member', require('./api/member/member.router'))
app.use('/api/outlet', require('./api/outlet/outlet.router'))
app.use('/api/package', require('./api/package/package.router'))
app.use('/api/transaction', require('./api/transaction/transaction.router'))
app.use('/api/transaction-detail', require('./api/transactionDetail/detail.router'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port} 🚀`)
})
