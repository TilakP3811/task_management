module Api
  module V1
    class TasksController < ApplicationController
      def index
        render json: Task.ordered(params[:page])
      end
    end
  end
end