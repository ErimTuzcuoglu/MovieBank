module Api::V1
	class RatingsController < ApplicationController
	  before_action :authorize_request, except: [:create, :index]

	  before_action :set_rating, only: [:show, :update, :destroy]

	  # GET /ratings
	  def index
	    @ratings = Rating.all

	    render json: @ratings
	  end

	  # GET /ratings/1
	  def show
	    render json: @rating
	  end

	  # POST /ratings
	  def create
	    @rating = Rating.new(rating_params)

	    if @rating.save
	      #render json: @rating, status: :created, location: @rating
	      render json: @rating, status: :created
	    else
	      #render json: @rating.errors, status: :unprocessable_entity
	      render json: { errors: @rating.errors.full_messages },
               status: :unprocessable_entity
	    end
	  end

	  # PATCH/PUT /ratings/1
	  def update
	    if @rating.update(rating_params)
	      render json: @rating
	    else
	      render json: @rating.errors, status: :unprocessable_entity
	    end
	  end

	  # DELETE /ratings/1
	  def destroy
	    @rating.destroy
	  end

	  private
	    # Use callbacks to share common setup or constraints between actions.
	    def set_rating
	      @rating = Rating.find(params[:id])
	    end

	    # Only allow a trusted parameter "white list" through.
	    def rating_params
	      params.permit(:user_id, :rating_value, :rating_movie_id)
	    end
	end 
end

#params.fetch(:user, {}).permit(:first_name, :last_name, :email, :phone, 
 #                                  :addresses_attributes => [:id, :street1, :street2, :city, :state, :country, :zipcode, :_destroy, :user_id])
