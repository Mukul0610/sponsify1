import cron from 'node-cron';


const updateDocuments = async () => {
    let count=0
    console.log("Schedul task"+count)
    count=count+1
}

cron.schedule('* * * * *', updateDocuments);

export { updateDocuments };