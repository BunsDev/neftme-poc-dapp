import React from "react"
import "./styles.css"
import { View } from 'react-native';
import { withMainScrollView } from '@hocs';
import { requestAccountAddress, waitForAccountAuth } from "@celo/dappkit";
import * as Linking from 'expo-linking'

export async function login() {
  console.log("alo")
  const requestId = "login";
  const dappName = "NEFTME App";
  const callback = Linking.createURL("https://www.google.pt");
  console.log("alo 2");
  
  requestAccountAddress({
    requestId,
    dappName,
    callback,
  });
  console.log("alo 3");
  //Linking.canOpenURL("https://metamask.app.link/dapp/localhost:19006")
  let a = Linking.openURL("https://metamask.app.link/dapp/connect")
  //const dappkitResponse = await waitForAccountAuth(requestId);
  //console.log(a);
  //window.open("https://metamask.app.link/dapp/")
  console.log("window open");
  // The pepper is not available in all Valora versions
  /*this.setState({ 
    address: dappkitResponse.address, 
    phoneNumber: dappkitResponse.phoneNumber, 
    pepper: dappkitResponse.pepper 
  });*/
  console.log("Teste a ver se ja tem o address");
  //console.log(dappkitResponse.address);
};

const Wallet = () => (
  <View>
    <div className="wallet flex-col-hstart-vstart clip-contents">
      <div className="frame-600 flex-col-hstart-vstart">
        <div className="frame-625 flex-col-hstart-vstart">
          <div className="status-bar flex-row-vstart-hstart">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/kwt13wj967-I2%3A298%3B134%3A541?alt=media&token=c3823e4f-7066-444f-ac74-9a125a3c5b17"
              alt="Not Found"
              className="mobile-signal"
            />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/kwt13wj967-I2%3A298%3B134%3A547?alt=media&token=a54b4f15-4bad-4369-a3fa-0470356d472e"
              alt="Not Found"
              className="wifi"
            />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/kwt13wj967-I2%3A298%3B134%3A552?alt=media&token=bd69ea32-0623-49b4-8190-d722038371f6"
              alt="Not Found"
              className="battery"
            />
          </div>
          <div className="frame-643 flex-row-vstart-hstart">
            <div className="frame-644 flex-row-vcenter-hend">
              <p className="txt-482 flex-hcenter">Skip</p>
            </div>
          </div>
          <div className="frame-623 flex-col-hcenter-vcenter">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/kwt13wj967-2%3A303?alt=media&token=e8962bbb-dd6d-4305-bf05-1eaa14a61947"
              alt="Not Found"
              className="union"
            />
            <div className="frame-622 flex-row-vstart-hstart">
              <div className="frame-646 flex-col-hcenter-vcenter">
                <div className="frame-602 flex-col-hcenter-vcenter">
                  <div className="frame-641 flex-col-hstart-vstart">
                    <div className="frame-597 flex-row-vcenter-hstart">
                      <div className="frame-577 flex-col-hstart-vcenter">
                        <div className="frame-576 flex-row-vcenter-hstart">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/kwt13wj967-2%3A342?alt=media&token=a803a330-e066-4dbf-89f7-17ba4cc56216"
                            alt="Not Found"
                            className="frame-328"
                          />
                          <p className="txt-272 flex-hcenter">
                            Log in with Instagram
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="frame-646 flex-col-hcenter-vcenter">
                    <p className="txt-589 flex-hcenter">
                      Or choose your wallet
                    </p>
                    <div className="frame-600 flex-col-hstart-vstart">
                      <div className="frame-5971 flex-row-vcenter-hstart">
                        <div className="frame-577 flex-col-hstart-vcenter">
                          <div className="frame-576 flex-row-vcenter-hstart">
                            <img
                              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/kwt13wj967-I2%3A349%3B788%3A8324?alt=media&token=a7f9e574-8045-4d05-be5f-5997e50bba73"
                              alt="Not Found"
                              className="frame-328"
                            />
                            <a href="https://metamask.app.link/dapp/google.com"></a>
                            <button className="txt-272 flex-hcenter" onClick={login}>Valora Login</button>
                          </div>
                        </div>
                      </div>
                      <div className="frame-598 flex-row-vcenter-hstart">
                        <div className="frame-577 flex-col-hstart-vcenter">
                          <div className="frame-576 flex-row-vcenter-hstart">
                            <img
                              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/kwt13wj967-I2%3A350%3B788%3A8330?alt=media&token=673a76d2-bcf5-4b08-a058-8e0677b213ec"
                              alt="Not Found"
                              className="rectangle-1492"
                            />
                            <p className="txt-272 flex-hcenter">Valora</p>
                          </div>
                        </div>
                      </div>
                      <div className="frame-586 flex-row-vcenter-hstart">
                        <div className="frame-5771 flex-col-hstart-vcenter">
                          <div className="frame-576 flex-row-vcenter-hstart">
                            <img
                              src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/kwt13wj967-I2%3A352%3B788%3A8310?alt=media&token=57161748-b697-4619-83c6-fad8b64afd18"
                              alt="Not Found"
                              className="rectangle-1492"
                            />
                            <p className="txt-469 flex-hend">Rainbow</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="frame-646 flex-col-hcenter-vcenter">
                  <div className="frame-616 flex-col-hcenter-vcenter">
                    <div className="frame-5761 flex-row-vcenter-hstart">
                      <p className="txt-2721 flex-hcenter">
                        I don’t have a wallet
                      </p>
                    </div>
                  </div>
                  <div className="frame-601 flex-row-vcenter-hcenter">
                    <p className="txt-787 flex-hcenter">New to wallets?</p>
                    <p className="txt-1028 flex-hcenter">Learn more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </View>
);

export default withMainScrollView(Wallet);
