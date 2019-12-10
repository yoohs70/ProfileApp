import * as React from 'react';
import styles from './ProfileApp.module.scss';
import { IProfileAppProps } from './IProfileAppProps';
import { IReactCrudState } from './IReactCrudState';
import { escape } from '@microsoft/sp-lodash-subset';
/* added */
import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration, ISPHttpClientOptions } from '@microsoft/sp-http';

import * as jquery from 'jquery';
import { IListItem } from './IListItem';
import 'bootstrap/dist/css/bootstrap.min.css';

// for Date format
import * as moment from 'moment';

import ReactHtmlParser from 'react-html-parser';

export default class ProfileApp extends React.Component<IProfileAppProps, IReactCrudState> {
  /* added */
  constructor(props: IProfileAppProps, state: IReactCrudState){
    super(props);

    this.state = {
      items: [    
        {    
          "Title": "",    
          "EmployeeId": "",    
          "Experience":"",   
          "Location":"",
          "PhoneNumber": "",
          "Email": "",
          "Address": "",
          "Summary": "",
          "Modified": "",
          "EducationItem":[],
          "ExperienceItem":[],
          "ProfileImage": ""
        }    
      ] 
    };
  }


  public render(): React.ReactElement<IProfileAppProps> {
    moment.locale('en');
    /* added */

    return (
      <div>   
       
            {this.state.items.map(function(item,key){    
                
              return (<div key={key}>  
                <div className="container">
                  {/* Header */}
                  <div className="resume">
                    <header className={styles["page-header"]}>
                      <h1 className={styles["page-title"]}>Resume of {item.Title }</h1>
                      <small> <i className="fa fa-clock-o"></i> Last Updated on: <time>{ moment(item.Modified).format('MMMM Do YYYY, h:mm:ss a') }</time></small>
                    </header>
                  </div>

                  
                  <div className="panel panel-default">
                    <div className="panel-heading resume-heading">
                      {/* Profile */}
              
                      <div className={styles["spacePadding"] + " row"}>
                       

                          <div className="col-xs-4 col-sm-4 col-lg-4">
                            <figure>
                              <img className={styles["profileImage"] + " img-fluid img-responsive"} alt="" src={item.ProfileImage}></img>
                            </figure>

                            {/* Social Buttons */}
                          {/*  
                              <div className="col-xs-3 col-md-1 col-lg-1 social-btn-holder">
                                <a href="#" className="btn btn-social btn-block btn-google">
                                  <i className="fa fa-google"></i> </a>
                              </div>
                          
                              <div className="col-xs-3 col-md-1 col-lg-1 social-btn-holder">
                                <a href="#" className="btn btn-social btn-block btn-facebook">
                                  <i className="fa fa-facebook"></i> </a>
                              </div> */}
                        
                          </div>
                          <div className="col-xs-8 col-sm-8 col-lg-8">
                            <ul className="list-group">
                              <li className="list-group-item">Name. {item.Title}</li>                                    
                              <li className="list-group-item">Experiences. {item.Experience}</li>
                              <li className="list-group-item"><i className="fa fa-phone"></i> Phone no. {item.PhoneNumber}</li>
                              <li className="list-group-item"><i className="fa fa-envelope"></i> Email. {item.Email} </li>
                            </ul>
                          </div>
                        
                      </div>
                      
                      {/* Summary */}
                      <div className={styles["bs-callout"] + " " +styles["bs-callout-danger"]}>
                        <h4>Summary</h4>
                        <p>
                          { item.Summary}
                        </p>
                      </div>
                      
                      {/* Education */}
                      <div className={styles["bs-callout"] + " " +styles["bs-callout-danger"]}>
                        <h4>Education</h4>
                                         
                        {item.EducationItem.map(function(school,key){  
                          //EmployeeNameId: 1 => ID in EmployeeList

                          return (<div key={key}> 
                                    <div className={styles["educationDiv"]}>
                                      <h6>
                                        { school.Title }
                                      </h6>
                                      <p>
                                        { school.Degree }, { school.Field }
                                      </p>
                                      <p>
                                  
                                        {moment(school.StartYear).format('YYYY MM')} - {moment(school.EndYear).format('YYYY MM')}
                                      </p>
                                    </div>
                                  </div>
                            );
                        })}
                        
                      </div>

                      {/* Experience */}
                      <div className={styles["bs-callout"] + " " +styles["bs-callout-danger"]}>
                        <h4>Experiences</h4>
                                         
                        {item.ExperienceItem.map(function(company,key){  

                          return (<div key={key}> 
                                    <div className={styles["educationDiv"]}>
                                    <h6>
                                        { company.Company }
                                      </h6>
                                      <h6>
                                        { company.Title }
                                      </h6>
                                      <p>
                                        {moment(company.StartDate).format('YYYY MM')} - {moment(company.EndDate).format('YYYY MM')}
                                      </p>
                                      <p>
                                     
                                        {ReactHtmlParser (company.Description)}
                                     
                                      </p>
                                     
                                    </div>
                                  </div>
                            );
                        })}
                        
                      </div>

                    </div>
                      </div>
                    </div>
                  </div>
                
                 
            
              );  
            })}  
                             
      </div>     
    );
  }


  public componentDidMount(){    
    var reactHandler = this;  

    var employeeData;
    var educationData;
    var experienceData;
    var pictureData;
    
    getListItems("EmployeeList", reactHandler);

    jquery.when(getListItems('EmployeeList', reactHandler), getListItems('Education',reactHandler),getListItems('Experience',reactHandler),getPictureItems('ProfilePictures',reactHandler, "Hyosang Yoo"))
      .then(function(r1, r2, r3, r4) { // Resolve

        var schools = {};
        // list items from EmployeeList
        employeeData = r1[0].d.results;
        // list items from Education List
        educationData = r2[0].d.results;
        // list items from Experience List
        experienceData = r3[0].d.results;

        pictureData = r4[0].d.results;


        /* get picture url */
        var filename = pictureData[0].FileLeafRef  ;
        var dir =  pictureData[0].FileDirRef  ;
        filename = dir + '/' + filename;

        // Add education and experience items arrays to employeeData
        employeeData[0]["EducationItem"] = educationData;
        employeeData[0]["ExperienceItem"] = experienceData;
        employeeData[0]["ProfileImage"] = filename;

        reactHandler.setState({    
          items: employeeData

        }); 
      }, function(){ // Reject!
      console.log('Something broke!');
    });
      
    function getListItems(listName, reactHandler){
      var listItems;

      var defer = jquery.Deferred();

      return jquery.ajax({    
        url: `${reactHandler.props.siteurl}/_api/web/lists/getbytitle('${listName}')/items`,    
        type: "GET",    
        headers:{'Accept': 'application/json; odata=verbose;'},    
        success: function(resultData) {  
          //listItems = defer.resolve(resultData.d.results);
          listItems = defer.resolve(resultData.d.results);
          /* reactHandler.setState({    
            items: resultData.d.results   
          });  */   
        },    
        error : function(jqXHR, textStatus, errorThrown) {    
        }
       
      });
      
     
    }

    function getPictureItems(listName, reactHandler, employeeName){
      var pictureItems;
      var defer = jquery.Deferred();
      

      return jquery.ajax({    
        url: `${reactHandler.props.siteurl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,FileLeafRef,FileDirRef,Description&$filter=Title eq '${employeeName}'`,    
        type: "GET",    
        headers:{'Accept': 'application/json; odata=verbose;'},    
        success: function(resultData) {  
          //listItems = defer.resolve(resultData.d.results);
          pictureItems = resultData.d.results;
          /* reactHandler.setState({    
            items: resultData.d.results   
          });  */
        
              
        },    
        error : function(jqXHR, textStatus, errorThrown) {    
        }
       
      });
    
    }
       
  } 


  
}
