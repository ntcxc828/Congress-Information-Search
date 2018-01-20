var app=angular.module('MyApp', [ 'angularUtils.directives.dirPagination']);
app.controller('Myctr',function($scope,$http) {
    /*move left navigation bar */
    var isHiden = true;   
    $('#stack').click(function(){  
        if(isHiden){  
            $('#sidebar').animate({left:'-15%'});
            $(".all").animate({ marginLeft: '0' });
        }else{  
            $('#sidebar').animate({left:'0'}); 
            $(".all").animate({ marginLeft: '15%' });
        }  
        isHiden = !isHiden;  
    }); 
    
    /*click different bar, show different interface*/
    $scope.tab = 1;
    $scope.setTab = function(newTab){
        $scope.tab = newTab;
    };
    $scope.isSet = function(tabNum){
        return $scope.tab === tabNum;
    };
    
    /*pagination*/
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.pageChangeHandler = function(num) {
      console.log(num);
  };
    
    
    /*show legislators detail*/
    $scope.detail=function(item){
        $scope.image="https://theunitedstates.io/images/congress/original/"+item.bioguide_id+".jpg";
        $scope.Name=item.title+"."+" "+item.last_name+","+" "+item.first_name;
        $scope.Emaillink='mailto:'+item.oc_email;
        $scope.Email=item.oc_email;
        if(item.oc_email==null){
            $scope.Email="N.A.";
        }
        else if(item.oc_email!=null){
            $scope.Email=item.oc_email;
        }
        $scope.Chamber=item.chamber;
        $scope.Contact=item.phone;
        $scope.Party=item.party;
        if($scope.Party=='R'){
            $scope.Party='Republican';
            $scope.Party_img='http://cs-server.usc.edu:45678/hw/hw8/images/r.png';
        }
        if($scope.Party=='D'){
            $scope.Party='Democrat';
            $scope.Party_img='http://cs-server.usc.edu:45678/hw/hw8/images/d.png';
        }
        if($scope.Party=='I'){
            $scope.Party='Independent';
            $scope.Party_img='http://cs-server.usc.edu:45678/hw/hw8/images/h.png';
        }
        $scope.Start_term=item.term_start;
        $scope.End_term=item.term_end;
        $scope.today=new Date();
        $scope.today=Date.parse($scope.today);
        $scope.start=Date.parse(item.term_start);
        $scope.end=Date.parse(item.term_end);
        $scope.diff1=$scope.today-$scope.start;
        $scope.diff2=$scope.end-$scope.start;
        $scope.result=$scope.diff1/$scope.diff2*100;
        $scope.result=parseInt($scope.result);
        $scope.Office=item.office;
        $scope.State=item.state_name;
        if(item.fax==null){
            $scope.Fax='N.A.';
        }
        else{
            $scope.Fax=item.fax;
        }
        $scope.Birthday=item.birthday;
        if(item.twitter_id==null){
            $scope.Twitter='N.A.';
        }
        else{
            $scope.Twitter=item.twitter_id;
        }
        if(item.facebook_id==null){
            $scope.Facebook='N.A.';
        }
        else{
            $scope.Facebook=item.facebook_id;
        }
        if(item.website==null){
            $scpe.Website='N.A.';
        }
        else{
            $scope.Website=item.website;
        }
        $scope.ids=item.bioguide_id;
        $http({
            method :"GET",
            url : "HW8.php" ,
            params:{member_ids:$scope.ids}
        }).then(function mySucces(response) {
            $scope.members_ids = response.data.results;
        }, function myError(response) {
        $scope.members_ids = response.statusText;
  });
        $http({
            method :"GET",
            url : "HW8.php" ,
            params:{sponsor_ids:$scope.ids}
        }).then(function mySucces(response) {
            $scope.sponsor_ids = response.data.results; 
        }, function myError(response) {
        $scope.sponsor_ids = response.statusText;
  });
        $scope.bio_ids=item.bioguide_id;
    };
    
    
    
    /*show Bill detail*/
    $scope.BillDetail=function(item){
        $scope.BillId=item.bill_id;
        $scope.Type=item.bill_type;
        $scope.Title=item.official_title;
        $scope.Sponsor=item.sponsor.title+"."+item.sponsor.last_name+","+item.sponsor.first_name;
        $scope.Chamber=item.chamber;
        $scope.Status=item.history.active;
        if($scope.Status==true){
            $scope.Status="Active";
        }
        if($scope.Status==false){
            $scope.Status="jioj";
        }
        $scope.Date=item.introduced_on;
        $scope.CongressURL=item.urls.congress;
        $scope.Version=item.last_version.version_name;
        $scope.BillURL=item.last_version.urls.pdf;
        console.log($scope.BillURL);
        if($scope.BillURL==null){
            $scope.BillURL="N.A.";
        }
        else{
            $scope.BillURL=item.last_version.urls.pdf;
        }
        $scope.bills=item.bill_id;
        
    }
    
    /*get data*/
    $http({
    method :"GET",
    url : "HW8.php" ,
    params:{database:"legislators"}
    }).then(function mySucces(response) {
      $scope.Leg_data = response.data.results;
    }, function myError(response) {
      $scope.Leg_data = response.statusText;
  });
    
    $http({
    method:"GET",
    url:"HW8.php",
    params:{database:"bills",bill:"active"}
    }).then(function mySucces(response){
        $scope.Bill_data=response.data.results;
        console.log($scope.Bill_data);
    },function myError(response){
        $scope.Bill_data=response.statusText;
    });
    
    $http({
    method:"GET",
    url:"HW8.php",
    params:{database:"bills",bill:"new"}
    }).then(function mySucces(response){
        $scope.Bill_ndata=response.data.results;
        console.log($scope.Bill_ndata);
    },function myError(response){
        $scope.Bill_ndata=response.statusText;
    });
    
   $http({
    method :"GET",
    url : "HW8.php" ,
    params:{database:"committees"}
    }).then(function mySucces(response) {
      $scope.Com_data = response.data.results;
//      console.log($scope.Leg_data);
    }, function myError(response) {
      $scope.Com_data = response.statusText;
  });
    
    
    /*favorite*/
    $scope.save=function(item){
        $scope.bioarr = JSON.parse(localStorage.getItem('bioarr')) || [];
        if ($scope.bioarr.indexOf(item) !== -1){
            $scope.bioarr.splice($scope.bioarr.indexOf(item), 1);
        }
        else {
            
            $scope.bioarr.push(item);
        }
        
        
        $scope.Changecolor = function(id){
            if ($scope.bioarr.indexOf(id) !== -1){      
				return true;
               /* console.log("2");*/
            }
            else{
               /* console.log('1');*/
				return false;
            }
//            localStorage.setItem("star",$scope.bioarr.indexOf(id)); 
        };
        localStorage.setItem("bioarr", JSON.stringify($scope.bioarr));
        $scope.favlegarr = [];
//        alert($scope.bioarr.length);
        for(var i=0;i<$scope.bioarr.length;i++){
            $http({
                method:"GET",
                url:"HW8.php",
                params:{
                    'bio_id':$scope.bioarr[i]
                }
            }).then(function mySucces(response){
                    $scope.favlegitem=response.data.results;
                    $scope.favlegarr.push($scope.favlegitem);
            },function myError(response){
                $scope.favlegitem=response.statusText;
            });
            
        }
    };
    
    $scope.saved = JSON.parse(localStorage.getItem('bioarr'));
    $scope.Changecolor = function(id){
    if ($scope.saved.indexOf(id) !== -1){
        return true;
    }
    else{
        return false;
        }
    };
    $scope.favlegarr = [];
    
    angular.forEach($scope.saved, function(value){
        $scope.bio_id = value;
        $http({
            method: "GET",
            url: "HW8.php",
            params: {
                'bio_id': $scope.bio_id
            }
        }).then(function mySuccess(response){
            $scope.favlegitem = response.data.results;
            $scope.favlegarr.push($scope.favlegitem);
        }, function myError(response){
            $scope.favlegitem = response.statusText;
        });
        
    });
    
    
    /*leg remove data*/
  $scope.remove=function(item){ 
      $scope.favlegarr.splice(item,1);
      $scope.del=item.bioguide_id
      $scope.del_id=JSON.parse(localStorage.getItem('bioarr'));
      $scope.del_id.splice($scope.del,1);
      localStorage.setItem("bioarr",JSON.stringify($scope.del_id));      
 };
 
  
  
  /*bill fav*/
  $scope.save1 = function(item){
      $scope.billarr = JSON.parse(localStorage.getItem('billarr')) || [];
      if ($scope.billarr.indexOf(item) !== -1){
          $scope.billarr.splice($scope.billarr.indexOf(item), 1);
      }
      else {
          $scope.billarr.push(item);
      }
      $scope.Changecolor1 = function(id){
          if ($scope.billarr.indexOf(id) !== -1){
				return true;
          }
          else{
				return false;
          }
     };
      localStorage.setItem("billarr", JSON.stringify($scope.billarr));
      $scope.favbillarr = [];
      for(var i=0;i<$scope.billarr.length;i++){
        $http({
                method:"GET",
                url:"HW8.php",
                params:{
                    'bill_id':$scope.billarr[i]
            }
        }).then(function mySucces(response){
                    $scope.favbillitem=response.data.results;
                    $scope.favbillarr.push($scope.favbillitem);
//                    alert("111");
        },function myError(response){
                $scope.favbillitem=response.statusText;
        });
            
    }
  };
      $scope.billsaved = JSON.parse(localStorage.getItem('billarr'));
      $scope.Changecolor1 = function(id){
      if ($scope.billsaved.indexOf(id) !== -1){
          return true;
      }
      else{
          return false;
      }               
  };
      $scope.favbillarr = [];
      angular.forEach($scope.billsaved, function(value){
          $scope.favbillid = value;
          $http({
				method: "GET",
				url: "HW8.php",
				params: {
						'bill_id': $scope.favbillid
				}
          }).then(function mySuccess(response){
				$scope.favbillitem = response.data.results;
				$scope.favbillarr.push($scope.favbillitem);
          }, function myError(response){
				$scope.favbillitem = response.statusText;
          });
      });
   
    
    /*bill remove*/
 $scope.remove1=function(item){ 
      $scope.favbillarr.splice(item,1);
      $scope.del=item.bill_id;
      $scope.del_id=JSON.parse(localStorage.getItem('billarr'));
      $scope.del_id.splice($scope.del,1);
      localStorage.setItem("billarr",JSON.stringify($scope.del_id));      
}
 
 /*commi*/
 
$scope.save2= function(item){
    $scope.comarr = JSON.parse(localStorage.getItem('comarr')) || [];
      if ($scope.comarr.indexOf(item) !== -1){
          $scope.comarr.splice($scope.comarr.indexOf(item), 1);
          angular.element(document.getElementById(item)).removeClass("yellow");
      }
      else {
          $scope.comarr.push(item);
          angular.element(document.getElementById(item)).addClass("yellow");
      }
      localStorage.setItem("comarr", JSON.stringify($scope.comarr));
      $scope.favcomarr = [];
      for(var i=0;i<$scope.comarr.length;i++){
        $http({
                method:"GET",
                url:"HW8.php",
                params:{
                    'com_id':$scope.comarr[i]
            }
        }).then(function mySucces(response){
                    $scope.favcomitem=response.data.results;
                    $scope.favcomarr.push($scope.favcomitem);
        },function myError(response){
                $scope.favcomitem=response.statusText;
        });
            
    }
};
      $scope.comsaved = JSON.parse(localStorage.getItem('comarr'));
      $scope.favcomarr = [];
      angular.forEach($scope.comsaved, function(value){
          $scope.favcomid = value;
          $http({
				method: "GET",
				url: "HW8.php",
				params: {
						'com_id': $scope.favcomid
				}
          }).then(function mySuccess(response){
				$scope.favcomitem = response.data.results;
				$scope.favcomarr.push($scope.favcomitem);
          }, function myError(response){
				$scope.favcomitem = response.statusText;
          });
      });


  $scope.remove2=function(item){ 
      $scope.favcomarr.splice(item,1);
      $scope.del=item.committee_id;
      $scope.del_id=JSON.parse(localStorage.getItem('comarr'));
      $scope.del_id.splice($scope.del,1);
      localStorage.setItem("comarr",JSON.stringify($scope.del_id));  
      
      
 }
  $scope.Changecolor3=function(item){
  
  }
    
});
	app.filter('unique', function() {
        return function(collection, keyname) {
				var output = [], 
				keys = [];
				angular.forEach(collection, function(item) {
					var key = item[keyname];
					if(keys.indexOf(key) === -1) {
						
						keys.push(key); 
						
						output.push(item);
					}
				});
				
				return output;
			};
		});

/*first character uppercase*/
app.filter('capitalize',function(){
    return function(input){
        if(input){
            return input[0].toUpperCase()+input.slice(1);
}
        
}
});



