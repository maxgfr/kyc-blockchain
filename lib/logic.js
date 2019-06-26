/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Validate Entity transaction
 * @param {org.maxgfr.ValidateEntityTransaction} validateEntityTransaction
 * @transaction
 */
async function validateEntityTransaction(tx) {

    tx.client.bacaIdentity = tx.bacaIdentity;

    const participantRegistry = await getParticipantRegistry('org.maxgfr.Client');
    await participantRegistry.update(tx.client);

    let event = getFactory().newEvent('org.maxgfr', 'ValidateEvent');
    event.client = tx.client;
    event.bacaIdentity = tx.bacaIdentity;
    emit(event);
}

/**
 * Make a loan transaction
 * @param {org.maxgfr.MakeALoanTransaction} makeALoanTransaction
 * @transaction
 */
async function makeALoanTransaction(tx) {

    if(tx.client.bacaIdentity) {
        if (tx.client.listLoan) {
          tx.client.listLoan.push(tx.loan);
        } else {
          tx.client.listLoan = [tx.loan];
        }
        if (tx.bank.listClient) {
          tx.bank.listClient.push(tx.client);
        } else {
          tx.bank.listClient = [tx.client];
        }
    }

    const participantRegistryClient = await getParticipantRegistry('org.maxgfr.Client');
    await participantRegistryClient.update(tx.client);

    const participantRegistryBank = await getParticipantRegistry('org.maxgfr.Bank');
    await participantRegistryBank.update(tx.bank);

}
