 var expect = chai.expect;

describe('unit test...[sum(arg0,arg1)]', function(){
     it('传递正确的参数', function(){
         var result=sum(1,2)
		 expect(result).to.equal(3);
     });

	 it('传递一个参数', function(){
         var result=sum(1)
		 expect(result).to.equal(NaN);
     });

 });

