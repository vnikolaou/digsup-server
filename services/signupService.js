'use strict';

const db = require('../config/db');
const Email = require('../models/email');
const mailService = require('./mailService');

class SignupService {
    async findAll() {
        const emails = await Email.findAll();
        if(emails) {
            return emails.map(email => email.dataValues );
        }

        return [];
    }

    async processEmails() {
        let results = [];

        const unsetEmails = await this.findAllUnsent();
        if(unsetEmails) {
            for(let i=0; i < unsetEmails.length; i++) {
                let entry = unsetEmails[i];
                try {
                    const msgId = await mailService.sendMail(entry.email);
                    console.log('msgId = ' + msgId);
                    const mark = msgId.length > 0 ? true : false; 
                    if(mark) { 
                        await this.markEmailAsSent(entry.email);
                    }    
                    results.push({ email: entry.email, sent: mark });
                } catch(err) {
                    console.log(err);
                    results.push({ email: entry.email, sent: false });
                }     
            };
        }
        return results;
    }

    async findAllUnsent() {
        const emails = await Email.findAll({
            where: {
              sent: 0
            }
        });

        if(emails) {
            return emails.map(email => email.dataValues );
        }

        return [];        
    }

    async markEmailAsSent(email) {
        await Email.update({ sent: 1 }, {
            where: {
            email: email
            }
        });
    }    

    async countByEmail(email) {
        return await Email.count({
            where: {
              email: email
            }
        });
    }

    async persistEmail(email) { 
        const total = await this.countByEmail(email);

        if(total > 0) {
            return false;
        } 
        const user = await Email.create({
            email,
            sent: 0
        }, { });
        return true;  
    }
}

module.exports = new SignupService();